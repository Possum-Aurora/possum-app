import { usePossumContract } from 'hooks/useContract'

export async function useFixedApy (pid:number) {
    const useContract = usePossumContract()
    const res = await useContract?.trancheAddresses(pid)
    console.log('argentWalletDetector==', res)
    return res
}
