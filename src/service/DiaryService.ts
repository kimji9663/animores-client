import AxiosContext from "../screens/context/AxiosContext";

export namespace DiaryService {
	export const diary = {
		list: async ({ page = 1, size = 5 }: { page?: number; size?: number }) => {
			try {
				const response = await AxiosContext.get(`/api/v1/diaries?page=${page}&size=${size}`);
				return { data: response.data, status: response.status };
			} catch (error) {
				console.error('DiaryService.diary.list:', error);
				return { data: null, status: error || 500 };
			}
		},
		delete: async ( diaryId: number ) => {
			try {
				const response = await AxiosContext.delete(`/api/v1/diaries/${diaryId}`);
		
				return { data: response.data, status: response.status };
			} catch (error) {
				console.error('DiaryService.diary.delete:', error);
				return { data: null, status: error || 500 };
			}
		}
	}
}