import { readContract } from '@wagmi/core'
import { wagmiConfig } from '../main'

import { contractAbi, contractAddress } from '../config/contract'


export const readStudent = async (address: string) => {
    const result = await readContract(wagmiConfig, {
        abi : contractAbi,
        address: contractAddress,
        functionName: 'getStudentDetails',
        account: address, 
      })

    console.log(result)  
}