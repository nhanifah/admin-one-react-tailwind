import React from "react";
import WideCardBoxModal from "../CardBox/WideModal";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { showModal } from "../../stores/affiliateSlice";
import StudentAffiliateLists from "../Table/StudentAffiliateLists";

export default function AffiliateStudentLists() {
    const dispatch = useAppDispatch()
    const modalStudents = useAppSelector((state) => state.affiliate.modal)
    const handleModalAction = () => {
        dispatch(showModal(false))
        // Reset the form
      }

    return (
        <WideCardBoxModal
      title={`Daftar siswa`}
      buttonColor="info"
      buttonLabel="Done"
      isActive={modalStudents}
      onConfirm={handleModalAction}
      onCancel={handleModalAction}
    >
      <StudentAffiliateLists />
    </WideCardBoxModal>
    )
}