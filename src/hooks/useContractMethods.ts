import { Contract } from '@ethersproject/contracts'
import { formatBigNumber } from 'utils/formatBalance'
import { TrancheParameters, PoolData } from 'state/types'
import { ethers } from 'ethers'
import { TransactionResponse } from '@ethersproject/providers'
import { notification } from 'antd'

export const checkFetchPool = async (useContract: Contract | null, token: any): Promise<PoolData | null> => {
    try {
        const result = await useContract?.trancheRunningParams(token.pid)
        const parametersResult = await useContract?.trancheParameters(token.pid)
        const symbolADepositedResponse: any = await getDepositedByAddress(useContract, token.aTrancheAddress)
        const symbolBDepositedResponse: any = await getDepositedByAddress(useContract, token.bTrancheAddress)
        // console.log('checkFetchPool result===', parametersResult)
        return {
            ...token,
            isEarningsEnd: result.canRedeem, // canRedeem true 判断池子收益已经结束
            trancheInitTime: result.trancheInitTime.toNumber(), // // 池子的开始时间
            redemptionPercentage: result.redemptionPercentage,
            TranchTotalYToken: result.TranchTotalYToken,
            TranchTotalOrigToken: result.TranchTotalOrigToken,
            RISK: parametersResult.RISK.toNumber(),
            gamePeriod: parametersResult.gamePeriod.toNumber(), // a 池子的fundding 期 fix 池子
            lockPeriod: parametersResult.lockPeriod.toNumber(), // 最终锁定结束期
            maxVaribleToken: parametersResult.maxVaribleToken.toNumber(),
            minVaribleToken: parametersResult.minVaribleToken.toNumber(),
            storedTrancheAPrice: Number(formatBigNumber(parametersResult.storedTrancheAPrice)), // fixed apy (初始price 1)
            storedTrancheBPrice: Number(formatBigNumber(parametersResult.storedTrancheBPrice)), // variable apy  (age apy storedTrancheAPrice和storedTrancheBPrice 取最大apy)
            tranchBTimeout: parametersResult.tranchBTimeout.toNumber(), // b 池子的fundding 期 variable 先判断B
            varibleTokenLimit: Number(formatBigNumber(parametersResult.varibleTokenLimit)),
            underlyingDecimals: parametersResult.underlyingDecimals,
            symbolADepositedBalance: symbolADepositedResponse.depositedBalance,
            symbolBDepositedBalance: symbolBDepositedResponse.depositedBalance 
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export const trancheParameters = async (useContract: Contract | null, pid: number): Promise<TrancheParameters | null> => {
    try {
        const parametersResult = await useContract?.trancheParameters(pid)
        // console.log('checkFetchPool result===', parametersResult)
        return {
            RISK: parametersResult.RISK.toNumber(),
            gamePeriod: parametersResult.gamePeriod.toNumber(), // a 池子的fundding 期 fix 池子
            lockPeriod: parametersResult.lockPeriod.toNumber(), // 最终锁定结束期
            maxVaribleToken: parametersResult.maxVaribleToken.toNumber(),
            minVaribleToken: parametersResult.minVaribleToken.toNumber(),
            storedTrancheAPrice: Number(formatBigNumber(parametersResult.storedTrancheAPrice)), // fixed apy (初始price 1)
            storedTrancheBPrice: Number(formatBigNumber(parametersResult.storedTrancheBPrice)), // variable apy  (age apy storedTrancheAPrice和storedTrancheBPrice 取最大apy)
            tranchBTimeout: parametersResult.tranchBTimeout.toNumber(), // b 池子的fundding 期 variable 先判断B
            varibleTokenLimit: Number(formatBigNumber(parametersResult.varibleTokenLimit)),
            underlyingDecimals: parametersResult.underlyingDecimals,
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export const getFixedApy = async (useContract: Contract | null, pid: number): Promise<TrancheParameters | null> => {
    try {
        const result = await useContract?.trancheParameters(pid)
        return {
            RISK: result.RISK.toNumber(),
            gamePeriod: result.gamePeriod.toNumber(), // a 池子的fundding 期 fix 池子
            lockPeriod: result.lockPeriod.toNumber(), // 最终锁定结束期
            maxVaribleToken: result.maxVaribleToken.toNumber(),
            minVaribleToken: result.minVaribleToken.toNumber(),
            storedTrancheAPrice: Number(formatBigNumber(result.storedTrancheAPrice)), // fixed apy (初始price 1)
            storedTrancheBPrice: Number(formatBigNumber(result.storedTrancheBPrice)), // variable apy  (age apy storedTrancheAPrice和storedTrancheBPrice 取最大apy)
            tranchBTimeout: result.tranchBTimeout.toNumber(), // b 池子的fundding 期 variable 先判断B
            varibleTokenLimit: Number(formatBigNumber(result.varibleTokenLimit)),
            underlyingDecimals: result.underlyingDecimals
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export const getDepositedByAddress = async (useContract: Contract | null, address: string) => {
    try {
        const result = await useContract?.getTokenSupply(address)
        return {
            depositedBalance: Number(formatBigNumber(result))
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export const getBalanceByTokenAddress = async (useContract: Contract | null, address: string, account: string | null | undefined) => {
    try {
        const result = await useContract?.getTokenBalance(address, account)
        return {
            balance: Number(formatBigNumber(result))
        }
    } catch (error) {
        console.error(error)
        return { balance: 0 }
    }
}

// variable pool
export const buyTrancheBToken = async (useContract: Contract | null, poolPid: number, amount: string) => {
    try {
        console.log(`buy BToken poolPid==${poolPid}, amount==${amount}`)
        let amountTo = ethers.utils.parseEther(amount + '')
        const result: TransactionResponse = await useContract?.buyTrancheBToken(poolPid, amountTo)
        console.log('buyTrancheBToken result===', result)
        return result
    } catch (error: any) {
        notification['error']({
            message: 'Notification Title',
            description: error.message || error.data?.message,
        })
        return ''
    }
}

// fixed pool
export const buyTrancheAToken = async (useContract: Contract | null, poolPid: number, amount: string) => {
    try {
        console.log(`buy AToken poolPid==${poolPid}, amount==${amount}`)
        let amountTo = ethers.utils.parseEther(amount + '')
        const result: TransactionResponse = await useContract?.buyTrancheAToken(poolPid, amountTo)
        console.log('buyTrancheAToken result===', result)
        return result
    } catch (error: any) {
        notification['error']({
            message: 'Notification Title',
            description: error.message || error.data?.message,
        })
        return ''
    }
}

export const approve = async (useContract: Contract | null, address: string, amount: string | number) => {
    try {
        let amountTo = ethers.utils.parseEther(amount + '')
        let response: TransactionResponse = await useContract?.approve(address, amountTo)
        const receipt: any = await response.wait()
        console.log('receipt==', receipt)
        return receipt
    } catch (error: any) {
        notification['error']({
            message: 'Notification Title',
            description: error.message || error.data?.message,
        })
        return ''
    }
}

export const redeemTrancheToken = async (useContract: Contract | null, poolPid: number) => {
    try {
        const result: TransactionResponse = await useContract?.redeemTrancheToken(poolPid)
        console.log('redeemTrancheToken result===', result)
        return result
    } catch (error: any) {
        notification['error']({
            message: 'Notification Title',
            description: error.message || error.data?.message,
        })
        return ''
    }
}