import { Skeleton } from 'antd'
import styled from 'styled-components'

const SkeletonItemBox = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 246px;
    background: var(--headerBg);
    border-radius: 8px;
    margin-top: 20px;
    padding: 20px;
`

const SkeletonItem = () => {
    return (
        <SkeletonItemBox>
            <Skeleton active paragraph={{rows: 4}} />
        </SkeletonItemBox>
    )
}

export default SkeletonItem