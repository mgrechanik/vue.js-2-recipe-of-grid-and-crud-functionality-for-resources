/**
 * The host address of the resource
 */
export const HOST = 'http://localhost:3000/';

/**
 * The adress of the list of the resources
 */
export const LIST = HOST + 'profiles';

/**
 * The route path of the page with list of these items.
 * Needs to redirect at it after create/update item.
 */
export const LIST_PAGE_ROUTE = '/profiles';

/**
 * Module name
 */
export const MODULE_NAME = 'profile';


/**
 * Building the url for getting objects of the current page
 * 
 * @param {*} context  Context like in actions
 * @param {*} pageNumber 
 * @returns string Absolute url 
 */
export function buildUrl(context, pageNumber)
{
    // pagination part:
    let url = LIST + '?_page=' + pageNumber + '&_limit=' + context.state.pageSize;
    
    // filtering part:
    let idFilter = context.state.condition.filter.id;
    if (idFilter) {
        url += '&id_like=' + idFilter;
    }
    let titleFilter = context.state.condition.filter.title;
    if (titleFilter) {
        url += '&title_like=' + titleFilter;
    }
    let genderFilter = context.state.condition.filter.gender;
    if (genderFilter) {
        url += '&gender=' + genderFilter;
    } 
    let numberFilter = context.state.condition.filter.number;
    if (numberFilter) {
        url += '&number_like=' + numberFilter;
    }     

    // sorting part:
    let sort = context.state.condition.sort;
    for (let prop in sort) {
        if (sort[prop]) {
            url += '&_sort=' + prop + '&_order=' + sort[prop];
            break;
        }
    }
    return url;
}

/**
 * Function to validate data in create/edit form
 * 
 * @param {*} data 
 * @returns Object of this type
 *   {
 *       'has_error': true/false     // Whether there are validation errors of not
 *       [not_valid_field_name]: 'error message for this field'
 *       ... 
 *       [not_valid_field_nameN]: ...
 *   };
 */
export function validateForm(data) {
    let res = {
        'has_error': false
    };
    if (!data.title) {
        res['title'] = 'title must not be empty';
    }
    if (!data.gender) {
        res['gender'] = 'gender must not be empty';
    }    
    let reg = /^\d{4}-\d{4}-\d{4}$/;
    if (data.number && !reg.test(data.number)) {
        res['number'] = 'Incorrect format of the number';
    }    
    for (let prop in res) {
        if (prop != 'has_error') {
            res['has_error'] = true;
        } 
    }
    return res;
}

/**
 * Function to validate data in filter row of the GridView
 * 
 * @param {*} data 
 * @returns  Object @see validateForm
 */
export function validateSearchForm(data) {
    let res = {
        'has_error': false
    };
    let reg = /^\d+$/;
    if (data.id && !reg.test(data.id)) {
        res['id'] = 'id must be a number';
    }
    
    let gender = +data.gender;
    if (gender && ([2, 3].indexOf(gender) == -1)) {
        res['gender'] = 'gender is incorrect';
    }    
    for (let prop in res) {
        if (prop != 'has_error') {
            res['has_error'] = true;
        } 
    }
    return res;
}