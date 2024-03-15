module.exports = {
    modifyUser: (response) => {
        const obj = {
            id: response.id,
            first_name: response.first_name,
            last_name: response.last_name,
            email: response.email,
            google_id: response.google_id,
            facebook_id: response.facebook_id,
            login_type: response.login_type
        }
        return obj
    }
}