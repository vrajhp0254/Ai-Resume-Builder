// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../db/resumedb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connect();
    // Perform database actions, e.g., db.collection('users').find({})
    res.status(200).json({ message: 'Connected successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
}
