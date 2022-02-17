import { IntlProvider } from 'react-intl'
import { Routes, Route } from 'react-router-dom'
import ComHeader from 'components/Header'
import { Layout } from 'antd'
import Possum from './Possum'
import Markets from './Markets'
import Portfolio from './Portfolio'
import Detail from './Markets/detail'
import { useAppSelector } from 'state/hooks'
import { useEffect } from 'react'
import { getTokenList } from 'constants/tokens'
import { usePossumContract } from 'hooks/useContract'
import { checkFetchPool } from 'hooks/useContractMethods'
import { useAppDispatch } from 'state/hooks'
import { setPoolListHander } from 'state/pool/actions'
import { PoolData } from 'state/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { numSub } from 'utils/countNumber'

const { Header, Content } = Layout

const App = (props: any) => {
    const { chainId } = useActiveWeb3React()
    const tokens: Array<any> = getTokenList(chainId)
    const locale = useAppSelector((state) => state.locale.localeState)
    const useContract = usePossumContract()
    const dispatch = useAppDispatch()

    useEffect(() => {
        checkAvailabelPool()
        const timer = setInterval(() => {
            checkAvailabelPool()
          }, 10000)
          return () => {
            clearInterval(timer)
          }
    }, [tokens, chainId])

    // 检查还有收益的池子
    const checkAvailabelPool = async () => {
        console.log('chainId==', chainId)
        const poolPromise = tokens.map((token) => checkFetchPool(useContract, token))
        const poolResponses = await Promise.all(poolPromise)
        const currentTimersec = new Date().getTime() / 1000
        let poolList:PoolData[] = []
        console.log('poolResponses==', poolResponses)
        poolResponses.forEach((item: any) => {
            if (item) {
                let tranchBTimeout = item.tranchBTimeout || 0 // b 池子的fundding 期 variable 先判断B
                let gamePeriod = item.gamePeriod || 0 // a 池子的fundding 期 fix 池子
                if (item.isEarningsEnd || (currentTimersec - item.trancheInitTime > tranchBTimeout && item.symbolBDepositedBalance === 0)) {
                    item.variableStatus = 'Closed'
                    item.fixedStatus = 'Closed'
                    item.isEarningsEnd = true
                    let fixedApyRate = 0
                    let variableApy = 0
                    let storedTrancheAPrice = item?.storedTrancheAPrice || 0
                    if (storedTrancheAPrice > 1) {
                        fixedApyRate = (storedTrancheAPrice - 1) * 100
                    } else if (storedTrancheAPrice < 1) {
                        let rate= (1 - storedTrancheAPrice) * 100
                        fixedApyRate = 0 - rate
                    }
                    let storedTrancheBPrice = item?.storedTrancheBPrice || 0
                    if (storedTrancheAPrice > 1) {
                        variableApy = (storedTrancheBPrice - 1) * 100
                    } else if (storedTrancheBPrice < 1) {
                        let rate= (1 - storedTrancheBPrice) * 100
                        variableApy = 0 - rate
                    }
                    item.fixedApy = fixedApyRate
                    item.variableApy = variableApy
                } else if (currentTimersec - item.trancheInitTime < tranchBTimeout) {
                    item.variableStatus = 'Funding'
                    item.fixedStatus = 'Incoming'
                } else if (currentTimersec - item.trancheInitTime < gamePeriod + tranchBTimeout) {
                    item.variableStatus = 'Closed'
                    item.fixedStatus = 'Funding'
                    let fixedApyRate:Number = 0
                    let storedTrancheAPrice = item?.storedTrancheAPrice || 0
                    if (storedTrancheAPrice === 0) {
                        fixedApyRate = 0
                    } else if (storedTrancheAPrice > 1) {
                        let sub = numSub(storedTrancheAPrice, 1)
                        fixedApyRate = Number(sub) * 100
                    } else if (storedTrancheAPrice < 1) {
                        let rate= (1 - storedTrancheAPrice) * 100
                        fixedApyRate = 0 - rate
                    }
                    item.fixedApy = fixedApyRate
                } else if (
                    currentTimersec - item.trancheInitTime > gamePeriod &&
                    !item.isEarningsEnd
                ) {
                    item.variableStatus = 'Closed'
                    item.fixedStatus = 'Closed'
                    let fixedApyRate = 0
                    let variableApy = 0
                    let storedTrancheAPrice = item?.storedTrancheAPrice || 0
                    if (storedTrancheAPrice > 1) {
                        fixedApyRate = (storedTrancheAPrice - 1) * 100
                    } else if (storedTrancheAPrice < 1) {
                        let rate= (1 - storedTrancheAPrice) * 100
                        fixedApyRate = 0 - rate
                    }
                    let storedTrancheBPrice = item?.storedTrancheBPrice || 0
                    if (storedTrancheAPrice > 1) {
                        variableApy = (storedTrancheBPrice - 1) * 100
                    } else if (storedTrancheBPrice === 0) {
                        variableApy = 0
                    } else if (storedTrancheBPrice < 1) {
                        let rate= (1 - storedTrancheBPrice) * 100
                        variableApy = 0 - rate
                    }
                    item.fixedApy = fixedApyRate
                    item.variableApy = variableApy
                }
                poolList.push(item)
            }  
        })
        console.log('poolList===', poolList)
        dispatch(setPoolListHander({poolList}))
    }

    return (
        <IntlProvider locale="en" messages={ locale } defaultLocale="en">
            <Layout>
                <Header>
                    <ComHeader />
                </Header>
                
                <Content>
                    <Routes>
                        <Route path="/" element={<Possum />} />
                        <Route path="/possum" element={<Possum />} />
                        <Route path="/markets" element={<Markets />} />
                        <Route path="/detail" element={<Detail />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                    </Routes>
                </Content>
            </Layout>
        </IntlProvider>
    )
}
export default App