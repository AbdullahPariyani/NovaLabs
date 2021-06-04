const buyerModel = new (require('../../Models/buyer/buyer'))();
const { STATUS_CODES } = require('../../Configs/constants');

class buyerController {

    async Add(request, response) {
        try {
            let result = await buyerModel.Add(request.body);
            response.handler.success(result, 'STATUS.SUCCESS')
        } catch (error) {
            console.log(error);
        }

    }

    async List(request, response) {
        try {
            let result = await buyerModel.List();
            response.handler.success(result, 'STATUS.SUCCESS')
        } catch (error) {
            console.log(error);
        }
    }

    async Search(request, response) {
        try {
            let result = await buyerModel.Search(request.body);
            response.handler.success(result, 'STATUS.SUCCESS')
        } catch (error) {
            console.log(error);
        }
    }

    async SearchByEmail(request, response) {
        try {
            let result = await buyerModel.SearchByEmail(request.body);
            response.handler.success(result, 'STATUS.SUCCESS')
        } catch (error) {
            console.log(error);
        }
    }

    async Search(request, response) {
        try {
            let result = await buyerModel.Search(request.body);
            response.handler.success(result, 'STATUS.SUCCESS')
        } catch (error) {
            console.log(error);
        }
    }

    async BookAppointment(request, response) {
        try {
            let result = await buyerModel.BookAppointment(request.body);
            response.handler.success(result, 'STATUS.SUCCESS')
        } catch (error) {
            console.log(error);
        }
    }

    async AccpetedBooking(request, response) {
        try {
            let result = await buyerModel.Login(request.body);
            response.handler.success(result, 'STATUS.SUCCESS')
        } catch (error) {
            console.log(error);
        }
    }

    async Login(request, response) {
        try {
            let result = await buyerModel.Login(request.body);
            response.handler.success(result, 'STATUS.SUCCESS')
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = buyerController;
