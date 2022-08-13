export const handleReload = () => {
        window.onbeforeunload = function() {
            return true;
        };
    
        return () => {
            window.onbeforeunload = null;
        };
}