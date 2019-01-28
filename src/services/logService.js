function init() {
    // Raven.config('https://7e88d0299b2543b6aba05d9a25b8ce2c@sentry.io/1375159',
    //     {release: '1-0-0', environment: 'development-test'}
    // ).install();
}

function log(error) {
    console.error(error);
    // Raven.captureException(error);
}

export default {
    init, log
};