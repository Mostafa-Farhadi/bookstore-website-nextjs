import { data } from "../../dataFile";
export default (req, res) => {
  res.status(200).json(data)
}
