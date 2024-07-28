import { useContext, useEffect, useState } from "react";
import EditorPanel from "./EditorPanel";
import {
  useCreateModelMutation,
  useDeleteModelMutation,
  useUploadDocumentMutation,
  useUploadPythonScriptMutation,
} from "../store";
import PythonScriptSnippet from "../constants/PythonScriptSnippet";
import MarkDownSnippet from "../constants/MarkDownSnippet";
import NotActiveEditorSnippet from "../constants/NotActiveEditorSnippet";
import ParameterForm from "./ParameterForm";
import ParameterView from "./ParameterView";
import UserContext from "../context/UserContext";
import NotFound from "./NotFound";
import CodeLog from "./CodeLog";
import LoadingContext from "../context/LoadingContext";
import ToastMessage from "./ToastMessage";
import ConfirmationDialog from "./ConfirmationDialog";
import { useNavigate } from "react-router-dom";

const CreateModelPanel = () => {
  const [createModel, createModelResult] = useCreateModelMutation();
  const [uploadPythonScript, uploadPythonScriptResult] =
    useUploadPythonScriptMutation();
  const [uploadDocumentation, uploadDocumentationResult] =
    useUploadDocumentMutation();
  const [deleteModel, deleteModelResult] = useDeleteModelMutation();
  const [editorId, setEditorId] = useState(1);
  const [codeLog, setCodeLog] = useState({
    type: "Info",
    message: "",
  });
  const [name, setName] = useState("");
  const [modelId, setModelId] = useState("");
  const [isFulfiled, setIsFulfilled] = useState(false);
  const [parameters, setParameters] = useState([]);
  const [parameterToDelete, setParameterToDelete] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const { user } = useContext(UserContext);
  const [showToast, setShowToast] = useState(false);
  const [toastList, setToastList] = useState([]);
  const isLoadingContext = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      createModelResult.isLoading ||
      uploadPythonScriptResult.isLoading ||
      uploadDocumentationResult.isLoading ||
      deleteModelResult.isLoading
    ) {
      isLoadingContext.setProgress(30);
    } else {
      isLoadingContext.setProgress(100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    createModelResult.isLoading,
    deleteModelResult.isLoading,
    uploadDocumentationResult.isLoading,
    uploadPythonScriptResult.isLoading,
  ]);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setToastList([]);
    }, 3000);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (event.target.value.length > 3) {
      setIsFulfilled(true);
    }
  };

  useEffect(() => {
    if (createModelResult.isSuccess) {
      setModelId(createModelResult?.data?.model?.id);
      setConfirmation(true);
      setParameters(createModelResult?.data?.parameters);
      if (createModelResult.status === 201) {
        setToastList([
          { message: "Model created successfully", type: "success" },
        ]);
      } else if (createModelResult.status === 200) {
        setToastList([
          { message: "Model updated successfully", type: "success" },
        ]);
      }
    } else if (createModelResult.status === 404) {
      setToastList([{ message: "Model not found", type: "error" }]);
    } else if (createModelResult.status === 400) {
      setToastList([
        { message: "An unexpected error occurred", type: "error" },
      ]);
    } else if (createModelResult.status === 500) {
      setToastList([{ message: "Internal server error", type: "error" }]);
    } else if (createModelResult.status === 422) {
      Object.keys(createModelResult?.error?.data?.errors).forEach((field) => {
        createModelResult?.error?.data?.errors[field].forEach(
          (errorMessage) => {
            setToastList((prevToastList) => [
              ...prevToastList,
              { message: errorMessage, type: "error" },
            ]);
          }
        );
      });
    } else {
      setToastList([{ message: "Don't know what happened", type: "error" }]);
    }
    handleShowToast();
  }, [
    createModelResult?.data?.model?.id,
    createModelResult?.data?.parameters,
    createModelResult?.error?.data?.errors,
    createModelResult.isSuccess,
    createModelResult.status,
  ]);

  const handleSubmitPython = (code) => {
    try {
      const pythonFile = new File([code], "script.py", {
        type: "text/x-python",
      });
      uploadPythonScript({ script: pythonFile, id: modelId });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitDoc = (code) => {
    try {
      const markdownFile = new File([code], "readme.md", {
        type: "text/markdown",
      });
      uploadDocumentation({ doc: markdownFile, id: modelId });
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnAbort = () => {
    deleteModel({ id: modelId });
    navigate("/home");
  };

  const handleFinish = () => {
    createModel({ name, parameters, id: modelId });
    // todo: promt user confirmation
  };

  const handleConfirmation = () => {
    setConfirmation(false);
    // todo: change model status in server
  };

  const handleAddParameter = (parameter) => {
    setParameters([...parameters, parameter]);
  };

  const handleEditParameter = (parameter) => {
    if (editIndex !== null) {
      setParameters(
        parameters.map((p, index) => (index === editIndex ? parameter : p))
      );
    }
    setEditIndex(null);
    document.getElementById("parameter-edit-form").close();
  };

  const handleDeleteRequest = (param) => {
    setParameterToDelete(param);
    document.getElementById("parameter-delete").showModal();
  };

  const handleDeleteParameter = () => {
    setParameters(parameters.filter((param) => param !== parameterToDelete));
    setParameterToDelete(null);
  };

  const handleEditRequest = (index) => {
    setEditIndex(index);
    document.getElementById("parameter-edit-form").showModal();
  };

  useEffect(() => {
    if (uploadDocumentationResult.isSuccess) {
      setEditorId(1);
    }
  }, [uploadDocumentationResult.isSuccess]);

  useEffect(() => {
    if (uploadPythonScriptResult.isSuccess) {
      setIsFulfilled(true);
      setCodeLog({
        type: "success",
        message: uploadPythonScriptResult?.data?.output,
      });
    }
    if (uploadPythonScriptResult.isError) {
      setCodeLog({
        type: "error",
        message: uploadPythonScriptResult?.error?.data?.message,
      });
    }
  }, [uploadPythonScriptResult]);

  let render = <NotFound />;
  if (user) {
    render = (
      <div className="flex w-full">
        <div className="w-2/5 max-h-screen overflow-auto">
          <div
            id="form-list"
            className="flex flex-col flex-grow bg-base-100 p-4 space-y-4"
          >
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text text-2xl font-bold">
                  Model name:
                </span>
                <input
                  type="text"
                  placeholder="Type..."
                  className="input w-full max-w-xs input-bordered"
                  name="name"
                  value={name || ""}
                  onChange={handleNameChange}
                />
              </label>
            </div>

            <div className="max-h-[40vh] overflow-auto">
              {parameters.map((param, index) => (
                <ParameterView
                  key={index}
                  parameter={param}
                  onDelete={() => handleDeleteRequest(param)}
                  onEdit={() => handleEditRequest(param, index)}
                />
              ))}
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                document.getElementById("parameter-form").showModal();
              }}
            >
              Add Parameter
            </button>
            {confirmation && (
              <button
                className="btn btn-error"
                onClick={() => {
                  document.getElementById("test-form").showModal();
                }}
              >
                Test model
              </button>
            )}

            <CodeLog log={codeLog} />

            <div id="below-button-list" className="flex justify-end ">
              <button
                className="btn btn-error mr-1"
                onClick={() => {
                  document.getElementById("cancel-model-creation").showModal();
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-info mr-1"
                disabled={!isFulfiled}
                onClick={() => setEditorId(2)}
              >
                Provide doc
              </button>
              {confirmation ? (
                <button
                  className="btn btn-success"
                  onClick={handleConfirmation}
                >
                  Confirm ok!
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  disabled={!isFulfiled}
                  onClick={handleFinish}
                >
                  {confirmation ? "update" : "Submit"}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="divider divider-horizontal max-w-2" />
        <div className="w-3/5">
          {editorId === 1 && (
            <EditorPanel
              initialCode={PythonScriptSnippet}
              language={"python"}
              isDisabledSubmit={false}
              onSubmit={handleSubmitPython}
            />
          )}
          {editorId === 2 && (
            <EditorPanel
              initialCode={MarkDownSnippet}
              language={"markdown"}
              isDisabledSubmit={false}
              onSubmit={handleSubmitDoc}
            />
          )}
          {editorId === 3 && (
            <EditorPanel
              initialCode={NotActiveEditorSnippet}
              language={"markdown"}
              isDisabledSubmit={true}
            />
          )}
        </div>
        <>
          <dialog
            id="parameter-form"
            className="modal modal-bottom sm:modal-middle"
          >
            <ParameterForm
              onSubmit={handleAddParameter}
              // existing={parameterToEdit}
              submitText="Add Parameter"
            />
          </dialog>
          <dialog
            id="parameter-edit-form"
            className="modal modal-bottom sm:modal-middle"
          >
            <ParameterForm
              onSubmit={handleEditParameter}
              submitText="Edit Parameter"
            />
          </dialog>
          <ConfirmationDialog
            componentId="parameter-delete"
            handlerFunction={handleDeleteParameter}
            buttonText="Delete!"
            title="Delete Parameter?"
            message="Are you sure you want to delete this parameter?"
          />
          <ConfirmationDialog
            componentId="cancel-model-creation"
            handlerFunction={handleOnAbort}
            buttonText="Yes, I am sure"
            title="Attention!!"
            message="Are you sure you want to cancel this model? It would erase all the proggress you have made."
          />
        </>
      </div>
    );
  }

  return (
    <>
      {showToast && <ToastMessage toastList={toastList} />}
      {render}
    </>
  );
};

export default CreateModelPanel;
