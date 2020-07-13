import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { upload } from "../actions";

function FileInput() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  // Drag and Drop properties
  const [count, setCount] = useState(0);
  const [drag, setDrag] = useState(false);
  const input = useSelector(state => state.input);
  // Uploaded files
  const [files, setFiles] = useState([]);
  const addFiles = (file) => setFiles([...files].concat(file));

  // List of listeners to drag and drop container
  useEffect(() => {

    function handleDragEnter(event) {
      event.preventDefault();
      event.stopPropagation();
      setCount(count + 1);
      if (event.dataTransfer.items) setDrag(true);
    }

    function handleDragLeave(event) {
      event.preventDefault();
      event.stopPropagation();
      setCount(count - 1);
    }

    function handleDragOver(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    function handleDrop(event) {
      event.preventDefault();
      event.stopPropagation();
      setDrag(false);
      if (event.dataTransfer.files) {
        addFiles(Array.from(event.dataTransfer.files));
        event.dataTransfer.clearData();
        setCount(0);
      }
    }

    let container = ref.current;
    container.addEventListener("dragenter", handleDragEnter);
    container.addEventListener("dragleave", handleDragLeave);
    container.addEventListener("dragover", handleDragOver);
    container.addEventListener("drop", handleDrop);

    return function cleanup() {
      container.removeEventListener("dragenter", handleDragEnter);
      container.removeEventListener("dragleave", handleDragLeave);
      container.removeEventListener("dragover", handleDragOver);
      container.removeEventListener("drop", handleDrop);
    }
  });

  // React hooks state does not update immediately, and do not use
  // callback like setState. UseEffect performs the side effects
  // when a variable in the dependency list updates.
  useEffect(() => setDrag(count > 0), [count]);

  function handleClick(event) {
    event.preventDefault();
    if (files) {
      dispatch(upload(files));
      setFiles([]);
    }
  }

  return (
    <div className={`outer-container ${ drag ? "drag" : "" }`} ref={ref}>
      <div className="inner-container">
        <FontAwesomeIcon
          icon={faUpload}
          size="8x"
          color={files.length ? "#FFF" : "#778899"}
          onClick={handleClick}/>
        <div className="label">
          <label htmlFor="file">Choose a file</label> or drag it here.
          <input
            id="file"
            type="file"
            accept="image/*"
            multiple
            onChange={event => setFiles(Array.from(event.target.files))}/>
        </div>
        <p className="filename">
        {
          input.loading ? "Uploading ... " :
          files.length ? (files.length > 1 ? `${files.length} Files Selected` : files[0].name) :
          input.error ? input.error : "No File Selected"
        }
        </p>
      </div>
    </div>
  )
}

export default FileInput
