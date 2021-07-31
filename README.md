# INTERFACE GMAIL IONIC

# PAGES
ionic g page pages/tabs

ionic g page pages/email
ionic g page pages/meet

ionic g page pages/account
ionic g page pages/details

# DIRECTIVES
ionic g module directives/sharedDirectives --flat
ionic g directive directives/hideHeader


# COMPONENTS

ionic g module components/sharedComponents --flat
ionic g component components/swipeItem

# DEPENDENCES
npm install @capacitor/haptics
npx cap sync

# DETAILS

O app conta com swipe item de lista,
toolbar animada, menu de opcoes com poppover, menu com mesclagem de tabs com menu lateral, e sistema de vibracao.