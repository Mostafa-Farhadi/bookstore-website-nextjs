import { data } from '../../../data';

export default (req, res) => {
    const {
        query: {id}
    } = req;

    res.status(200).json(data[id - 1]);
};
