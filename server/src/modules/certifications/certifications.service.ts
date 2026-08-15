import { CertificationsRepository }
from "./certifications.repository";

import {
  CreateCertificationInput,
} from "./certifications.validation";

const getAllCertifications =
  async () => {
    return await CertificationsRepository.findAll();
  };

const createNewCertification =
  async (
    data: CreateCertificationInput
  ) => {
    return await CertificationsRepository.create(
      data
    );
  };

const updateCertification = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<CreateCertificationInput>;
}) => {

  if (!id) {
    throw new Error("Id not provided");
  }

  const exists =
    await CertificationsRepository.findById(id);

  if (!exists) {
    throw new Error(
      "Certification not found"
    );
  }

  const dataToUpdate: Partial<CreateCertificationInput> =
    {};

  if (data.name !== undefined) {
    dataToUpdate.name = data.name;
  }

  if (data.issuer !== undefined) {
    dataToUpdate.issuer = data.issuer;
  }

  if (data.description !== undefined) {
    dataToUpdate.description =
      data.description;
  }

  if (data.issueDate !== undefined) {
    dataToUpdate.issueDate =
      data.issueDate;
  }

  if (data.credentialId !== undefined) {
    dataToUpdate.credentialId =
      data.credentialId;
  }

  if (data.credentialUrl !== undefined) {
    dataToUpdate.credentialUrl =
      data.credentialUrl;
  }

  return await CertificationsRepository.updateCertification({
    id,
    certification: dataToUpdate,
  });
};

const deleteCertification =
  async (id: string) => {

    const exists =
      await CertificationsRepository.findById(id);

    if (!exists) {
      throw new Error(
        "Certification record not found"
      );
    }

    return await CertificationsRepository.deleteOne(
      id
    );
  };

export const CertificationsService = {
  getAllCertifications,
  createNewCertification,
  updateCertification,
  deleteCertification,
};