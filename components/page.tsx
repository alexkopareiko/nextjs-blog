import { useSelector } from 'react-redux'

import Counter from './counter'

function Page() {
    const placeholderData = useSelector((state: any) => state.fetchUsersReducer.placeholderData)
    const error = useSelector((state: any) => state.fetchUsersReducer.error)
    const light = useSelector((state: any) => state.fetchUsersReducer.light)
    const lastUpdate = useSelector((state: any) => state.fetchUsersReducer.lastUpdate)
    return (
        <div>
            <Counter />
            {/* {placeholderData && (
                <pre>
                    <code>{JSON.stringify(placeholderData, null, 2)}</code>
                </pre>
            )}
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>} */}
        </div>
    )
}

export default Page