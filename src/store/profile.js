import omega from './omega';

let profile = Object.assign({}, omega);

profile.state = JSON.parse(JSON.stringify(omega.state));

profile.state.pageSize = 10;

profile.state.condition = {
    filter: {
        'id': '',
        'title': '',
        'gender': '',
        'number': '',
    },

    sort: {
        'id': 'asc',
        'title': '',
        'gender': '',
    }
}

export default profile;