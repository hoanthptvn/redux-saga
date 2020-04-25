const styles = theme => ({
    taskboard: {
        display: "flex",
        alignItems: "center"
    },
    shape: {
        padding: 20,
        margin: 10,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.color.primary,
        color: theme.shape.textColor
    }
})

export default styles;