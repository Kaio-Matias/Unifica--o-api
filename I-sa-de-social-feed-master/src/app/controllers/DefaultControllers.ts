import version from 'project-version';

import { Request, Response } from 'express';

async function index(req: Request, res: Response) {
  try {

   return res.json({ version });
  } catch (err) {

    return res.status(400).json({ message: err.message });
  }
}

export default index;
