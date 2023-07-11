import FlashMessage from 'react-flash-message'

function Message({ message }) {
    return (
    <FlashMessage duration={3000}>
        <strong>{message}</strong>
    </FlashMessage>
    )
}

export default Message