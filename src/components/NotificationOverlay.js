import InfoIcon from '@mui/icons-material/Info';

function NotificationOverlay({text,textClass = "text-primary"}) {

    return (
        <div className={"notification-overlay"}>
            <div className={"card shadow p-3 d-flex flex-row"}>
                <InfoIcon className={textClass+" me-2"}/>
                {text}
            </div>
        </div>
    );
}

export default NotificationOverlay;
