import {defineConfig, Plugin} from 'vite';
import {resolve} from 'path';
import handlebars from 'vite-plugin-handlebars';
import app from "./src/layouts/app/app";
import chats from "./src/layouts/chats/chats"
import auth from "./src/layouts/auth/auth"
import editPage from "./src/layouts/editPage/editPage"
import editPageBtns from './src/layouts/editPageBtns/editPageBtns';

export default defineConfig({
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
            helpers: {
                app,
                chats,
                auth,
                editPage,
                editPageBtns
            },
        }) as unknown as Plugin,
    ],

    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'src/pages/login/login.html'),
                signup: resolve(__dirname, 'src/pages/signup/signup.html'),
                cards: resolve(__dirname, 'src/pages/cards/chats__cards.html'),
                profileEdit: resolve(__dirname, 'src/pages/profileEdit/profileEdit.html'),
                editPassword: resolve(__dirname, 'src/pages/editPassword/editPassword.html'),
                saveChanges: resolve(__dirname, 'src/pages/saveChanges/saveChanges.html'),
                notFound: resolve(__dirname, 'src/pages/notFound/notFound.html'),
                internalErrorPage: resolve(__dirname, 'src/pages/internalErrorPage/internalErrorPage.html'),
            }
        }
    },
    server: {
        open: '/src/pages/login/signup.html'
    }
});