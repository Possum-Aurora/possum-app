import styled from "styled-components"
import BlueBgImg from 'images/BlueBgImg.png'
import { FormattedMessage } from 'react-intl'
import BlueApy from 'components/Card/BlueApy'
import Button from 'components/Button'
import { timestampToTime } from 'utils/timer'
import PenddingModal from 'components/Modal/PenddingModal'
import { useEffect, useState, useRef } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getBalanceByTokenAddress, getDepositedByAddress } from 'hooks/useContractMethods'
import ConfirmModal from 'components/Modal/ConfirmModal'
import ConectWalletModal from "components/Modal/ConectWalletModal"
import { usePossumContract, usePossumSingerContract } from 'hooks/useContract'
import { trancheParameters } from 'hooks/useContractMethods'
import { numSub } from 'utils/countNumber'
import { useBlockNumber } from 'state/block/hooks'
import EndBlueProgress from 'components/Progress/EndBlueProgress'

const CardBox = styled.div`
    position: relative;
    background: url(${BlueBgImg}) no-repeat;
    background-size: 100% 100%;
    width: 525px;
    height: 676px;
    .blueCard {
        color: var(--butBorderColor);
    }
`

const CardTitle = styled.div`
    position: absolute;
    font-size: 30px;
    font-family: DINPro-Bold, DINPro;
    font-weight: bold;
    left: 50%;
    top: 55px;
    transform: translate(-50%, -50%);/*相对于自己的百分比*/
`

const CardContent = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px 70px;
    margin-top: 100px;
`

const EndsInTime = styled.div`
    display: flex;
    justify-content: center;
    font-size: 24px;
    font-family: DINPro-Bold, DINPro;
    font-weight: bold;
    color: #FFFFFF;
    margin-top: 40px;
`

const ButtonBox = styled.div`
    width: 100%;
    margin: 30px 0;
`

const EndBlueCard = (props: any) => {
    const type:string = 'End-Fix'
    const penddingModalRef: any = useRef()
    const conectWalletModalRef:any = useRef()
    const { library, account, chainId } = useActiveWeb3React()
    const tokenAddress = props.buyerCoinAddress || ''
    const aTrancheAddress = props.aTrancheAddress || ''
    const possumContract = usePossumSingerContract()
    const [useBalance, setUseBalance] = useState(0)
    const [aTokenBalance, setATokenBalance] = useState(0)
    const confirmModalRef: any = useRef()
    const [currentFixedApy, setCurrentFixedApy] = useState(0)
    const useContract = usePossumContract()
    const latestBlockNumber = useBlockNumber()

    useEffect(() => {
        fetchBalance()
        getATokenBalance()
    }, [latestBlockNumber, library, account, chainId])

    const fetchBalance = async () => {
        const { balance } = await getBalanceByTokenAddress(possumContract, tokenAddress, account)
        setUseBalance(balance)
    }

    const getATokenBalance = async () => {
        const res = await getDepositedByAddress(possumContract, aTrancheAddress)
        setATokenBalance(res?.depositedBalance || 0)
    }

    useEffect(() => {
        countCurrentApy()
        const timer = setInterval(() => {
            countCurrentApy()
          }, 3000)
          return () => {
            clearInterval(timer)
          }
    }, [])

    const countCurrentApy = async () => {
        let res:any = await trancheParameters(useContract, props.pid)
        console.log('res====', res)
        if (res.storedTrancheAPrice) {
            let sum = numSub(res.storedTrancheAPrice, 1)
            setCurrentFixedApy(Number(sum) * 100)
        } else {
            setCurrentFixedApy(0)
        }
    }

    const onButClick = (type:string) => {
        if (type === 'noNetwork') {
            conectWalletModalRef.current.updateData({visible: true})
        } else {
            confirmModalRef.current.updateData({
                visible: true,
                logoUrl: props.logoUrl || '',
                productTitle: props.productTitle || '',
                productEpoch: props.productEpoch || '',
                symbolB: props.symbolA || '',
                name: props.name || '',
                pid: props.pid || 0,
                useBalance,
                tokenAddress,
                type: 'DepositFix',
                fixedApy: currentFixedApy,
                lockPeriod: props.lockPeriod,
                minVaribleToken: props.minVaribleToken,
                maxVaribleToken: props.maxVaribleToken,
                symbolADepositedBalance: props.symbolADepositedBalance,
                symbolBDepositedBalance: props.symbolBDepositedBalance,
                RISK: props.RISK
            })
        }
    }

    const updateStatus = (type: number) => {
        if (type === 0) {
            penddingModalRef.current.updateData({
                title: 'Deposit',
                visible: true,
                content: 'Deposit Fail',
                tradeStatus: 0 // 交易失败
            })
        } else if (type === 2) {
            penddingModalRef.current.updateData({
                title: 'Deposit',
                visible: true,
                content: 'Loading...',
                tradeStatus: 2 // 交易等待中
            })
        }
    }

    return (
        <CardBox>
            <CardTitle className="blueCard">
                <FormattedMessage id='card.title.fix' defaultMessage="" values={{name: ''}} />
            </CardTitle>

            <CardContent>
                <BlueApy title='Current Fixed APY' apy={currentFixedApy} tip='Fixed pool APY calculated based on the current variable pool/fixed pool ratio and variable pool protection rate' />
                
                <EndBlueProgress
                    maxVaribleToken={props.maxVaribleToken}
                    minVaribleToken={props.minVaribleToken}
                    symbolBDepositedBalance={props.symbolBDepositedBalance}
                    symbolADepositedBalance={aTokenBalance}
                />

                <EndsInTime>Ends in {timestampToTime(props.trancheInitTime + props.gamePeriod + props.tranchBTimeout)}</EndsInTime>

                <ButtonBox>
                    {
                        !chainId || !account ? 
                            <Button text='Connect Wallet' type='noNetwork' onButClick={(type) => onButClick(type)} />
                        :
                            <Button text='Deposit' type={type} onButClick={(type) => onButClick(type)} />
                    }
                </ButtonBox>              
            </CardContent>

            <ConfirmModal onRef={confirmModalRef} updateStatus={(type: number) => updateStatus(type)} />
            <ConectWalletModal onRef={conectWalletModalRef} />
            <PenddingModal onRef={penddingModalRef} />
        </CardBox>
    )
}

export default EndBlueCard