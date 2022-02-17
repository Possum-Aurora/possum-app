export interface TrancheParameters {
    RISK: number,
    gamePeriod: number,
    lockPeriod: number,
    maxVaribleToken: number,
    minVaribleToken: number,
    storedTrancheAPrice: number, // fixed apy (初始price 1)
    storedTrancheBPrice: number, // variable apy  (age apy storedTrancheAPrice和storedTrancheBPrice 取最大apy)
    tranchBTimeout: number,
    varibleTokenLimit: number,
    underlyingDecimals: number
}

export interface PoolData {
    name: string,
    buyerCoinAddress: string,
    productTitle: string,
    productEpoch: string,
    logoUrl: string,
    pid: number,
    symbolA: string,
    symbolB: string,
    fixedApy: number,
    variableApy: number,
    aTrancheAddress: string,
    bTrancheAddress: string,
    fixedStatus: string,
    variableStatus: string,
    isEarningsEnd: false, // 收益是否结束 true为结束
    trancheInitTime: number, // // 池子的开始时间
    redemptionPercentage: number,
    TranchTotalYToken: number,
    TranchTotalOrigToken: number,
    RISK: number,
    gamePeriod: number, // fixed池子的结束时间
    lockPeriod: number, // 整个池子结束时间
    maxVaribleToken: number,
    minVaribleToken: number,
    storedTrancheAPrice: number, // fixed apy (初始price 1)
    storedTrancheBPrice: number, // variable apy  (age apy storedTrancheAPrice和storedTrancheBPrice 取最大apy)
    tranchBTimeout: number, // variable池子的结束时间
    varibleTokenLimit: number, // goal
    underlyingDecimals: number,
    symbolADepositedBalance: number,
    symbolBDepositedBalance: number
}

export interface Token {
    name: string,
    productTitle: string,
    productEpoch: string,
    logoUrl: string,
    fixedStatus: string,
    variableStatus: string,
    fixedApy: number,
    variableApy: number,
    symbolADepositedBalance: number,
    symbolBDepositedBalance: number,
    trancheInitTime: number,
    gamePeriod: number, // fix池子结束时间
    tranchBTimeout: number, // variable池子结束时间
    maxVaribleToken: number,
    minVaribleToken: number,
    varibleTokenLimit: number,
    symbolA: string,
    symbolB: string,
    bTrancheAddress: string,
    buyerCoinAddress: string,
    pid: number,
    aTrancheAddress: string,
    lockPeriod: number, // 整个池子结束时间
    RISK: number,
}

export interface PoolDateState {
    poolList: PoolData[],
    isLoadSuccess: boolean
}