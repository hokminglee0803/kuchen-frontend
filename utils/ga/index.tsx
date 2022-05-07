// log the pageview with their URL
export const pageview = (url) => {
    window.gtag('config', 'G-P5GEVWMHMT', {
        page_path: url,
    })
}

// log specific events happening.
export const event = ({ action, params }) => {
    window.gtag('event', action, params)
}

// export const search = () => {
//     event({
//         action: "search",
//         params: {
//             search_term: query
//         }
//     })
// }