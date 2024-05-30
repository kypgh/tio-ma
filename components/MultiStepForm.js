"use client";
import React, { useState, ReactElement, useMemo } from "react";
import { useIsClient } from "usehooks-ts";

/**
 * @param {{
 *  initialFormState: Object,
 *  maxPages: Number,
 *  onSubmit: ((formData: Object) => void),
 *  children: ((helpers: {
 *    currentPage:  ,
 *    nextPage: ((formData: Object) => void),
 *    prevPage: ((formData: Object) => void),
 *    formState: Object
 *  }) => ReactElement[]),
 * }} param0
 * @returns
 */
const MultiStepForm = ({
  children,
  initialFormState,
  maxPages,
  onSubmit = () => {},
}) => {
  const [formState, setFormState] = useState(initialFormState);
  const [currentPage, setCurrentPage] = useState(0);

  function nextPage(values) {
    if (currentPage < maxPages - 1) {
      setFormState({ ...formState, ...values });
      setCurrentPage(currentPage + 1);
    } else {
      setFormState({ ...formState, ...values });
      onSubmit({ ...formState, ...values });
    }
  }

  function prevPage(values) {
    if (currentPage > 0) {
      setFormState({ ...formState, ...values });
      setCurrentPage(currentPage - 1);
    }
  }

  // This is necessary to avoid hydration errors!
  const isClient = useIsClient();
  if (!isClient) return null;
  const result = children({
    currentPage,
    nextPage,
    prevPage,
    formState,
  }).props.children;

  if (!result) return null;
  if (result.length > 0)
    return (
      <>
        {result.filter((x) => !x.props?.isPage)}
        {result
          .filter((x) => x.props?.isPage)
          .find((child) => child.props.page == currentPage + 1)}
      </>
    );
  return result;
};

export default MultiStepForm;

/**
 *
 * @param {{ children: ReactElement, page: Number, isPage: Boolean}} param0
 * @returns
 */
const FormWrapper = ({ children, page, isPage = true }) => {
  return children;
};

FormWrapper.defaultProps = {
  isPage: true,
};

export { FormWrapper };
