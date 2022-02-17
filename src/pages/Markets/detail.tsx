import styled from 'styled-components'
import { LeftOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import StartCard from './components/StartCard'
import ProgressCom from 'components/Progress'
import EpochHistory from './components/EpochHistory'
import EndCard from './components/EndCard'
import LiveCard from './components/LiveCard'
import ClaimCard from './components/ClaimCard'
import { Token } from 'state/types'

const DetailBox = styled.div`
    padding-top: 100px;
    padding-bottom: 60px;
`

const DetailContent = styled.div`
    width: var(--mainContentWidth);
    margin: auto;
`

const BackIcon = styled.div`
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    width: 30px;
    border-radius: 6px;
    border: 1px solid #177FFB;
    .anticon svg {
        color: #177FFB;
    }
    &:hover {
        border: 1px solid #fff;
        .anticon svg {
            color: #fff;
        }
    }
`

const DetailHeader = styled.div`
    display: flex;
    align-items: center;
    img {
        width: 35px;
        margin-left: 50px;
        margin-right: 10px;
    }
    .name {
        font-size: 18px;
        font-family: DINPro-Bold, DINPro;
        font-weight: bold;
        color: #FFFFFF;
    }
    .status {
        font-size: 18px;
        font-family: DINPro-Bold, DINPro;
        font-weight: bold;
        color: #979FB5;
        margin-left: 50px;
    }
`

const DetailCardContent = styled.div`
    margin-top: 50px;
`

const Detail = (props: any) => {
    let navigate = useNavigate()
    const location:any = useLocation() //获取跳转页面携带的值
    const token: Token = location.state && location.state.token ? location.state.token : {}
    const type = location.state ? location.state.type : ''
    window.scrollTo(0, 0);
    const backClick = () => {
        navigate('/markets', {state: {
            type,
        }, replace: true})
    }

    return (
        <DetailBox>
            <DetailContent>
                <DetailHeader>
                    <BackIcon onClick={backClick}>
                        <LeftOutlined />
                    </BackIcon>

                    <img alt='logoUrl' src={token.logoUrl} />

                    <div className='name'>
                        {token.productTitle}
                        <Tooltip placement="topLeft" title="efewrqwerweq">
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </div>

                    <div className='status'>{token.productEpoch}</div>
                    <div className='status'>{type.charAt(0).toUpperCase() + type.slice(1)} Funding</div>
                </DetailHeader>

                <DetailCardContent>
                    {
                        type === 'variable' ? 
                            <StartCard 
                                symbolBDepositedBalance={token.symbolBDepositedBalance}
                                trancheInitTime={token.trancheInitTime}
                                tranchBTimeout={token.tranchBTimeout}
                                minVaribleToken={token.minVaribleToken}
                                maxVaribleToken={token.maxVaribleToken}
                                varibleTokenLimit={token.varibleTokenLimit}
                                productTitle={token.productTitle}
                                productEpoch={token.productEpoch}
                                logoUrl={token.logoUrl}
                                symbolA={token.symbolA}
                                symbolB={token.symbolB}
                                bTrancheAddress={token.bTrancheAddress}
                                buyerCoinAddress={token.buyerCoinAddress}
                                pid={token.pid}
                                name={token.name}
                                RISK={token.RISK}
                            />
                        :
                            ''
                    }

                    {
                        type === 'fix' ?
                            <EndCard 
                                RISK={token.RISK}
                                symbolBDepositedBalance={token.symbolBDepositedBalance}
                                symbolADepositedBalance={token.symbolADepositedBalance}
                                logoUrl={token.logoUrl}
                                symbolA={token.symbolA}
                                symbolB={token.symbolB}
                                fixedApy={token.fixedApy}
                                trancheInitTime={token.trancheInitTime}
                                gamePeriod={token.gamePeriod}
                                tranchBTimeout={token.tranchBTimeout}
                                aTrancheAddress={token.aTrancheAddress}
                                bTrancheAddress={token.bTrancheAddress}
                                buyerCoinAddress={token.buyerCoinAddress}
                                variableApy={token.variableApy}
                                productTitle={token.productTitle}
                                productEpoch={token.productEpoch}
                                pid={token.pid}
                                name={token.name}
                                lockPeriod={token.lockPeriod}
                                minVaribleToken={token.minVaribleToken}
                                maxVaribleToken={token.maxVaribleToken}
                            />
                        :
                            ''
                    }

                    {
                        type === 'live' ?
                            <LiveCard 
                                symbolBDepositedBalance = {token.symbolBDepositedBalance}
                                symbolADepositedBalance = {token.symbolADepositedBalance}
                                fixedApy = {token.fixedApy}
                                variableApy = {token.variableApy}
                                trancheInitTime={token.trancheInitTime}
                                tranchBTimeout={token.tranchBTimeout}
                                lockPeriod={token.lockPeriod}
                                gamePeriod={token.gamePeriod}
                            />
                        :
                            ''
                    }

                    {
                        type === 'closed' ?
                            <ClaimCard 
                                productTitle={token.productTitle}
                                productEpoch={token.productEpoch}
                                symbolBDepositedBalance={token.symbolBDepositedBalance}
                                symbolADepositedBalance={token.symbolADepositedBalance}
                                fixedApy={token.fixedApy}
                                variableApy={token.variableApy}
                                pid={token.pid}
                                symbolA={token.symbolA}
                                symbolB={token.symbolB}
                                name={token.name}
                                aTrancheAddress={token.aTrancheAddress}
                                bTrancheAddress={token.bTrancheAddress}
                                logoUrl={token.logoUrl}
                                lockPeriod={token.lockPeriod}
                            />
                        :
                            ''
                    }
                </DetailCardContent>

                {
                    type === 'fix' || type === 'live' ? 
                    <ProgressCom  
                        symbolBDepositedBalance = {token.symbolBDepositedBalance}
                        symbolADepositedBalance = {token.symbolADepositedBalance}
                    />
                    :
                        ''
                }

                <EpochHistory />
            </DetailContent>
        </DetailBox>
    )
}

export default Detail