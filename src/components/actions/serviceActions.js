import axios from 'axios';

export const FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS';
export const FETCH_SERVICES_FAILURE = 'FETCH_SERVICES_FAILURE';

export const fetchServicesSuccess = (data) => ({
    type: FETCH_SERVICES_SUCCESS,
    payload: data,
});

export const fetchServicesFailure = (error) => ({
    type: FETCH_SERVICES_FAILURE,
    payload: error,
});

export const fetchServices = (token) => {
    return (dispatch) => {
        axios
            .get('https://take-home-test-api.nutech-integrasi.app/services', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(fetchServicesSuccess(response.data.data));
                } else {
                    dispatch(fetchServicesFailure('Gagal mendapatkan data services'));
                }
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(fetchServicesFailure(error.response.data.message));
                } else {
                    dispatch(fetchServicesFailure('Terjadi kesalahan saat menghubungkan ke server.'));
                }
            });
    };
};