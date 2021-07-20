import type { TransactionResponse } from '../types'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { ethers } from 'ethers';

import artifact from '../../contracts/Faucet.json';

const url = process.env.ETH_NODE_URL;
const privateKey = process.env.ETH_PRIVATE_KEY || "";
const faucetAddress = process.env.ETH_FAUCET_ADDRESS || "";

const provider = new ethers.providers.JsonRpcProvider(); 

const wallet = new ethers.Wallet(privateKey, provider);
const faucet = new ethers.Contract(faucetAddress, artifact.abi, wallet);

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TransactionResponse>
) {

  if(!req.body.address) {
    res.status(400);
    return;
  }

  await faucet.requestTokens(req.body.address, 1, {
    gasPrice: 25e9
  });

  res.status(200).json({ successful: true })
});
