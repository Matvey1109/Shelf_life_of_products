from backend.config import EDENAI_API_KEY, FILE_PATH
from langchain.llms import EdenAI
from langchain.embeddings import EdenAiEmbeddings
from langchain.chains import RetrievalQA
from langchain.vectorstores import Chroma
from langchain.document_loaders.csv_loader import CSVLoader
from pprint import pprint

llm = EdenAI(edenai_api_key=EDENAI_API_KEY, feature="text", provider="openai", model="text-davinci-003",
             temperature=0.7, max_tokens=250)

loader = CSVLoader(file_path=FILE_PATH)
data = loader.load()
vectorstore = Chroma.from_documents(data, EdenAiEmbeddings())
qa = RetrievalQA.from_llm(llm, retriever=vectorstore.as_retriever())


def get_answer_from_model_util(product: str, param: str, vacuum: bool, condition_param: str = None,
                               temperature_param: str = None):
    if param == "Условие":
        prompt = f"Через сколько испортится этот продукт? Назвние: {product}, место хранения: {condition_param}, наличие вакуума: {vacuum}"
    else:
        prompt = f"Через сколько испортится этот продукт? Назвние: {product}, температура места хранения: {temperature_param}, наличие вакуума: {vacuum}"

    answer = qa.run(prompt)
    return answer.strip()


# print(get_answer_from_model_util(product="Блинчики", param="Условие", condition_param="Морозильник", vacuum=True))
