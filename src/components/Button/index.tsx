import styled from "styled-components"

const ButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    .activeVariable {
       color: var(--redCardColor);
       border: 1px solid var(--redCardColor);
    }
`

const JoinReadNowBut = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 48px;
    border-radius: 8px;
    border: 1px solid var(--redCardColor);
    font-size: 16px;
    font-family: DINPro-Bold, DINPro;
    font-weight: bold;
    color: var(--redCardColor);
    &:hover {
        color: var(--whiteColor);
        border: 1px solid var(--whiteColor);
    }
`

const JoinBlueNowBut = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 48px;
    border-radius: 8px;
    border: 1px solid #FC077D;
    border: 1px solid var(--butBorderColor);
    font-size: 16px;
    font-family: DINPro-Bold, DINPro;
    font-weight: bold;
    color: var(--butBorderColor);
    &:hover {
        color: var(--whiteColor);
        border: 1px solid var(--whiteColor);
    }
`

const DepositBut = styled.div`
    cursor: pointer;
    width: 109px;
    text-align: center;
    height: 38px;
    line-height: 38px;
    border-radius: 8px;
    border: 1px solid var(--butBorderColor);
    font-size: 14px;
    font-family: DINPro-Medium, DINPro;
    font-weight: 500;
    color: var(--switchWalletBorderBgColor);
    &:hover {
        color: var(--whiteColor);
        border: 1px solid var(--whiteColor);
    }
`

const ConfirmBut = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: #2172E5;
    border-radius: 8px;
    border: 1px solid #177FFB;
    width: 100%;
    font-size: 16px;
    font-family: DINPro-Medium, DINPro;
    font-weight: 500;
    color: #FFFFFF;
    &:hover {
        color: var(--whiteColor);
        border: 1px solid var(--whiteColor);
    }
`

const NoNetworkBut = styled.div`
    opacity: .5;
    cursor: pointer;
    width: 150px;
    text-align: center;
    height: 38px;
    line-height: 38px;
    border-radius: 8px;
    border: 1px solid var(--redCardColor);
    font-size: 14px;
    font-family: DINPro-Medium, DINPro;
    font-weight: 500;
    color: var(--redCardColor);
    &:hover {
        opacity: 1;
    }
`

interface ButtonConfig {
    type: string,
    text: string,
    onButClick: (type:string) => void
}

const Button = ({
    type,
    text,
    onButClick,
}:ButtonConfig) => {
    return (
        <ButtonBox onClick={() => onButClick(type)}>
            {
                ['PossumVariableJoinNow', 'Deposit & Withdraw', 'VariantClaim'].includes(type) ?
                    <JoinReadNowBut>{text}</JoinReadNowBut>
                :
                    ''
            }

            {
                ['PossumFixedJoinNow', 'End-Fix', 'FixClaim' ].includes(type) ?
                    <JoinBlueNowBut>{text}</JoinBlueNowBut>
                :
                    ''
            }

            {
                type === 'fix' ?
                    <DepositBut>{text}</DepositBut>
                :
                    ''
            }

            {
                type === 'variable' ?
                    <DepositBut className="activeVariable">{text}</DepositBut>
                :
                    ''
            }

            {
                type === 'ConfirmDeposi' ?
                    <ConfirmBut>{text}</ConfirmBut>
                :
                    ''
            }

            {
                type === 'noNetwork' ?
                    <NoNetworkBut>{text}</NoNetworkBut>
                :
                    ''
            }
        </ButtonBox>
    )
}

export default Button