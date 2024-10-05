// pages/api/transfer.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { operatorTransferTokens } from '../../utils/blockchain';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { fromAddress, toAddress, amount } = req.body;

  if (!fromAddress || !toAddress || !amount) {
    return res.status(400).json({ message: 'Missing parameters' });
  }

  try {
    const txHash = await operatorTransferTokens(fromAddress, toAddress, amount);
    return res.status(200).json({ message: 'Tokens transferred successfully', txHash });
  } catch (error: any) {
    console.error('Error transferring tokens:', error);
    return res.status(500).json({ message: 'Error transferring tokens', error: error.message });
  }
}
