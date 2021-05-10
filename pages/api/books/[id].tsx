import type { NextApiRequest, NextApiResponse } from 'next';
import data  from '../../../lib/data.json';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { id }: any = req.query;
    res.status(200).json(data[id - 1]);
};

