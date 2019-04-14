const styles = theme => ({
    // --------------------------------------------------------------------------------------
    // ---------------------------------------ROOTS------------------------------------------
    // --------------------------------------------------------------------------------------

    // Apply to pages that do not have a sidebar
    root: {
        width: '100%',
        marginTop: 64,
    },

    // Apply to pages that need a bottom margin
    rootWithBottomMargin: {
        width: '100%',
        marginTop: '6em',
        marginBottom: theme.spacing.unit * 4,
    },

    rootForm: {
        width: '100%',
        marginTop: '6em',
        marginBottom: '6em',
    },

    // Apply to pages that have a sidebar
    rootWithSideBar: {
        flexGrow: 1,
        display: 'flex',
    },

    // Apply to pages that have a sidebar and need a bottom margin
    rootWithSideBarBottomMargin: {
        flexGrow: 1,
        display: 'flex',
        marginBottom: theme.spacing.unit * 4,
    },

    // Apply to pages that need additional space at the top
    toolbar: theme.mixins.toolbar,

    marginTheme: {
        margin: theme.spacing.unit,
    },

    // --------------------------------------------------------------------------------------
    // --------------------------------------BUTTONS-----------------------------------------
    // --------------------------------------------------------------------------------------

    // Buttons that are statically placed in the bottom right
    fabButton: {
        position: 'fixed',
        bottom: theme.spacing.unit * 8,
        right: theme.spacing.unit * 8,
        [theme.breakpoints.down('xs')]: {
            bottom: theme.spacing.unit * 2,
            right: theme.spacing.unit * 2,
        },
        zIndex: 1000,
    },

    // Apply to all buttons
    button: {
        margin: theme.spacing.unit,
    },

    // Apply to the image of button
    buttonWithIcon: {
        marginRight: theme.spacing.unit,
    },

    // Button Group that will right align on page like in a toolbar
    buttonGroupRight: {
        display: 'flex',
        justifyContent: 'flex-end',
    },

    buttonIcon: {
        margin: theme.spacing.unit,
    },

    // @SEE: formButton

    // --------------------------------------------------------------------------------------
    // ---------------------------------------FORMS------------------------------------------
    // --------------------------------------------------------------------------------------

    // Apply to a form grid
    formGrid: {
        padding: theme.spacing.unit * 2,
    },

    // Apply to grid items in a form
    formGridItem: {
        padding: theme.spacing.unit * 2,
    },

    // Apply to gird items in a form that only need side padding
    formGridItemSide: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingTop: 2,
        paddingBottom: 2,
    },

    // Apply to gird items in a form that only need top and bottom padding
    formGridItemTopBottom: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        paddingLeft: 2,
        paddingRight: 2,
    },

    // Linear Stepper
    stepper: {
        padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
    },
    // Apply to the child of the form's main <div />
    formLayout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(900 + theme.spacing.unit * 2 * 2)]: {
            width: '75%',
            maxWidth: 1000,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    // Apply to buttons within a grid form
    formButton: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
    },

    // Apply to the <Paper /> Component of a Form
    formPaper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        },
    },

    // --------------------------------------------------------------------------------------
    // -------------------------------------CARD LISTS---------------------------------------
    // --------------------------------------------------------------------------------------

    // Headline for a list of <Card />
    cardListHeadline: {
        fontWeight: '600',
        padding: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
        fontSize: '1.2rem',
        color: theme.palette.primary.main,
    },

    // Apply this to the <Icon /> within a <Card />
    cardWithIcon: {
        fontSize: '70px',
        alignContent: 'center',
        verticalAlign: 'middle'
    },

    row: {
        overflow: 'overlay',
    },

    // --------------------------------------------------------------------------------------
    // --------------------------------------SIDEBAR-----------------------------------------
    // --------------------------------------------------------------------------------------

    // Apply to different sections that belong to a sidebar
    sidebarSection: {
        padding: theme.spacing.unit,
        display: 'grid',
    },

    // Apply to <Typography /> that are the titles of sections in a sidebar
    sidebarSectionTitle: {
        fontWeight: '600',
        padding: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
        fontSize: '1.2rem',
        color: theme.palette.primary.main,
    },


    // --------------------------------------------------------------------------------------
    // -------------------------------------TYPOGRAPHY---------------------------------------
    // --------------------------------------------------------------------------------------

    // Bold Typography
    bold: {
        fontWeight: '600',
    },

    // Apply to titles of pages
    // These elements should be <Typography variant='subtitle1' />
    pageTitle: {
        padding: theme.spacing.unit * 2,
    },

    // --------------------------------------------------------------------------------------
    // ---------------------------------------LINKS------------------------------------------
    // --------------------------------------------------------------------------------------

    // Apply to NavLinks, <a />
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },

    // --------------------------------------------------------------------------------------
    // --------------------------------EXPANDABLE SECTION------------------------------------
    // --------------------------------------------------------------------------------------

    // Apply to ExpansionPanelSummary Child to show a name of the panel, Ex: Typography
    expandableHeading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },

    // Apply to ExpansionPanelSummary Child to show a description of the panel, Ex: Typography
    expandableSecondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },

    formExpandable: {
        marginRight: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
    },

    // --------------------------------------------------------------------------------------
    // --------------------------------------DIVIDERS----------------------------------------
    // --------------------------------------------------------------------------------------

    // Apply to any horizontal dividers
    divider: {
        marginTop: theme.spacing.unit * 2,
    },

    divider2: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },

    // --------------------------------------------------------------------------------------
    // -----------------------------------BOTTOM APP BAR-------------------------------------
    // --------------------------------------------------------------------------------------

    // Apply to the <AppBar />
    bottomAppBar: {
        top: 'auto',
        bottom: 0,
        backgroundColor: 'transparent',
    },

    // Apply to the <ToolBar /> within the <AppBar />
    bottomAppBarToolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    // Centers a button within the toolbar of a bottom navigation appbar
    appBarCenterFabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },

    // --------------------------------------------------------------------------------------
    // ------------------------------------PROGRESS BAR--------------------------------------
    // --------------------------------------------------------------------------------------

    // Apply to a <CircularProgress />
    progress: {
        margin: theme.spacing.unit * 2,
    },

    progressCenter: {
        display: 'block',
        margin: 'auto',
    },

    progressCenterWithToolbar: {
        display: 'block',
        margin: 'auto',
        marginTop: theme.spacing.unit * 6,
    },

    // --------------------------------------------------------------------------------------
    // ---------------------------------FLOOR PLAN TOOLBAR-----------------------------------
    // --------------------------------------------------------------------------------------
    toolbarItem: {
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },

});

export default styles;