(w => {
    if (Object.keys(w).length <= 0) {
        console.log('Window object not found.')
    }
})(typeof window !== 'undefined' ? window : {})