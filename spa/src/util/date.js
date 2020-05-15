export const dateMixin = {
    methods: {
        converterData(data){
            try{
                data = parseInt(data)
                data = new Date(data)
                if(data == "Invalid Date") return ''
                return data.toLocaleString()
            }catch(e){
                return ''
            }
        }
    }
}
export default dateMixin;