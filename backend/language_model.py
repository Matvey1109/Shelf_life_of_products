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
answer = qa.run("How much Maria spent on her chocolates?")
print(answer)
