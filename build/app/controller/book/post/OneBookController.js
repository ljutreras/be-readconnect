"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneBookController = void 0;
const StatusCode_1 = __importDefault(require("../../../../context/shared/constants/StatusCode"));
const PostgreSQLRepository_1 = require("../../../../context/shared/postgresql/PostgreSQLRepository");
const OneBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = req.body;
    try {
        const response = [];
        const users = yield PostgreSQLRepository_1.PostgreSQLRepository.create().getBooksQuery(filters, 'books');
        users.map((_, i) => {
            const date = users[i].publisheddate && JSON.parse(users[i].publisheddate)['$date'].substring(0, 10);
            response.push({
                id: users[i]._id,
                title: users[i].title,
                isbn: users[i].isbn,
                pageCount: users[i].pagecount,
                publishedDate: date,
                thumbnailUrl: users[i].thumbnailurl,
                shortDescription: users[i].shortdescription,
                longDescription: users[i].longdescription,
                status: users[i].status,
                authors: users[i].authors,
                categories: users[i].categories,
            });
        });
        return res.status(StatusCode_1.default.OK).json({
            data: response,
            totalPage: '33',
            page: '1',
            perPage: '1'
        });
    }
    catch (error) {
        if (error.id_u == undefined)
            return res.status(StatusCode_1.default.NOT_FOUND).json();
        return res.status(StatusCode_1.default.BAD_REQUEST).json({ error });
    }
});
exports.OneBookController = OneBookController;