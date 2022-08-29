import axios from 'axios'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        /**
         * Cache of objects who were loaded.
         * Object's id is the property name.
         */
        objects: {},

        /**
         * Pages with array of objects on every page
         */
        pages: {},

        /**
         * The size of the page
         */
        pageSize: 5,

        /**
         * The number of the current page
         */
        currentPageNumber: 1,

        /**
         * Total count of all items being paginated.
         * We take this value from server response
         */
        totalCount: 0,

        /**
         * Condition of displaying items
         */
        condition: {
            /**
             * Fittering condition which items should be displayed
             */
            filter: {
                'id': '',
                'title': '',
                'rating': ''
            },

            /**
             * Sorting condition of the order in which items are displayed
             */
            sort: {
                'id': 'asc',
                'title': '',
                'rating': '',
            }
        },

        /**
         * Module settings, set in the store/index.js
         */
        settings: {}
    } ,
    getters: {
        currentPageObjects(state) {
            return state.currentPageNumber in state.pages ?
                state.pages[state.currentPageNumber] : [];
        },
        endPageNumber(state) {
            return Math.ceil(state.totalCount / state.pageSize);
        },
        moduleName(state) {
            return state.settings.MODULE_NAME;
        }
    },
    mutations: {
        clearPages(state) {
            state.pages = {};
        },
        setCurrentPageNumber(state, pageNumber) {
            state.currentPageNumber = pageNumber;
        },
        setTotalCount(state, count) {
            state.totalCount = +count;
        },
        setPageSize(state, pageSize) {
            state.pageSize = +pageSize;
        },                
        setPage(state, what) {
            if (what.objects.length) {
                Vue.set(state.pages, what.pageNumber, what.objects);
            } else {
                Vue.delete(state.pages, what.pageNumber);
            }
        },
        setObjectsCache(state, objects) {
            for (let obj of objects) {
                state.objects[obj.id] = Object.assign({}, obj);
            }
        },
        updateObjectInCache(state, object) {
            state.objects[object.id] = Object.assign({}, object);
        },
        deleteObjectFromCache(state, id) {
            delete state.objects[id];
        },                
        setFilter(state, filter) {
            let cFilter = state.condition.filter;
            for (let prop in cFilter) {
                if (prop in filter) {
                    cFilter[prop] = filter[prop];
                }
            }
        },
        setSort(state, sort) {
            let cSort = state.condition.sort;
            for (let prop in cSort) {
                if (prop in sort) {
                    cSort[prop] = sort[prop];
                }
            }
        },  
        updateObjectOnCurrentPage(state, data) {
            let currentObjects = state.pages[state.currentPageNumber];
            for (let obj of currentObjects) {
                if (obj.id == data.id) {
                    for (let prop in obj) {
                        if ((prop in data) && (prop != 'id')) {
                            obj[prop] = data[prop];
                        }
                    }
                    break;
                }
            }
        }
         
    },
    actions: {

        /**
         * Initializing action.
         * Needs to be invoked at the beginning of the work.
         * 
         * @param {*} context 
         * @param {*} store 
         */
        initializeAction(context, store) {
            // when filter of sort condition is changed we need to rebuild data in grid
            store.watch(state => state[context.state.settings.MODULE_NAME].condition,
                () => {
                    context.commit('clearPages');
                    context.dispatch('setPageAction', 1)
                }, { deep: true});    
        },

        /**
         * Setting the current page.
         * 
         * @param {*} context 
         * @param {*} pageNumber 
         * @returns 
         */
        async setPageAction(context, pageNumber) {
            if (pageNumber < 1) {
                return;
            }
            if (!(pageNumber in context.state.pages)) {
                await context.dispatch('loadPageAction', {pageNumber});
            }   
            context.commit('setCurrentPageNumber', pageNumber);                     
        },

        /**
         * Loading page from server
         * 
         * @param {*} context 
         * @param {pageNumber: integer, reload: boolean} data 
         * @returns 
         */
        async loadPageAction(context, data) {
            let pageNumber = data.pageNumber || 1,
                reload = data.reload || false;

            if ((pageNumber in context.state.pages) && !reload) {
                return;
            }
            if (pageNumber < 1) {
                return;
            }
            try {
                let url = context.state.settings.buildUrl(context, pageNumber);
                let resp = await axios.get(url);

                context.commit('setTotalCount', resp.headers['x-total-count']);
                context.commit('setPage', {pageNumber, objects: resp.data});
                context.commit('setObjectsCache', resp.data);
            } catch (error) {
                console.log(error);
            }
        },  
        
        setFilterAction(context, filter) {
            context.commit('setFilter', filter);
        },

        setSortAction(context, sort) {
            context.commit('setSort', sort);
        },
        
        setPageSizeAction(context, pageSize) {
            context.commit('setPageSize', pageSize);
            context.commit('clearPages');
            context.dispatch('setPageAction', 1);            
        },        
        
        /**
         * Getting oblect by it's id
         * 
         * @param {*} context 
         * @param {*} id 
         * @returns 
         */
        async getObjectAction(context, id) {
            if (id in context.state.objects) {
                return context.state.objects[id];
            }
            try {
                let resp = await axios.get(context.state.settings.LIST + '/' + id);
                if (resp.data.id) {
                    context.commit('updateObjectInCache', resp.data);
                    return resp.data;
                }
            } catch (error) {
                console.log(error);
            }
            return null;
        }, 

        /**
         * Creating a new object
         * 
         * @param {*} context 
         * @param {*} data 
         */
        async createObjectAction(context, data) {
            try {
                delete data.id;
                let resp = await axios.post(context.state.settings.LIST, data);
                if (resp.data.id) {
                    context.commit('updateObjectInCache', resp.data);
                    await context.dispatch('loadPageAction', {pageNumber: context.state.currentPageNumber, reload: true});
                }
            } catch (error) {
                console.log(error);
            }
        }, 

        /**
         * Updating an existing object
         * 
         * @param {*} context 
         * @param {*} data 
         */
        async updateObjectAction(context, data) {
            try {
                let id = data.id;
                await axios.put(context.state.settings.LIST + '/' + id, data);
                context.commit('updateObjectOnCurrentPage', data);
                context.commit('updateObjectInCache', data);
                await context.dispatch('loadPageAction', {pageNumber: context.state.currentPageNumber, reload: true});
            } catch (error) {
                console.log(error);
            }

        },  

        /**
         * Deleting an existing object
         * 
         * @param {*} context 
         * @param {*} id 
         */
        async deleteObjectAction(context, id) {
            try {
                await axios.delete(context.state.settings.LIST + '/' + id);
                context.commit('deleteObjectFromCache', id);
                await context.dispatch('loadPageAction', {pageNumber: context.state.currentPageNumber, reload: true});
                if (!(context.state.currentPageNumber in context.state.pages)) {
                    context.commit('setCurrentPageNumber', 1);
                }
            } catch (error) {
                console.log(error);
            }
        },        
        
        
        
        
       
    }
}