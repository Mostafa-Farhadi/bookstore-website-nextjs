import { data } from '../../../dataFile';

export default (req, res) => {
    const {
        query: {id}
    } = req;

    res.status(200).json(data[id]);
};
