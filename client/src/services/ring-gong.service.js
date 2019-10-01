import api from '@/services/api';

export default {
    ring: ring,
    ringAll: ringAll
};

function ring(gongId) {
    return api().post(`ring/${gongId}`);
}

function ringAll() {
    return api().post('ringAll');
}