import * as Yup from 'yup'


export const inputSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    owner: Yup.string().required('Owner is required'),
    longitude: Yup.string().required('Longitude is required'),
    latitude: Yup.string().required('Latitude is required')
})