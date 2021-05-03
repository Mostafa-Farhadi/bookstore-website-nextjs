import { data } from '../../../lib/data';

export default (req, res) => {
    const {
        query: {id}
    } = req;

    res.status(200).json(data[id - 1]);
};
