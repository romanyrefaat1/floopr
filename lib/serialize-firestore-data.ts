type ConditionalsProps = { 
  isUpdatedAt?: boolean,
  isCreatedAt?: boolean,
  isLastFeedbackAt?: boolean,
  isLastUpdated?: boolean,
}

export default function serializeFirestoreData(
  firestoreData: any, 
  conditionals: Partial<ConditionalsProps> = {}
) {
  const {
    isUpdatedAt = true,
    isCreatedAt = true,
    isLastFeedbackAt = true,
    isLastUpdated = true,
  } = conditionals;

  const object = {
    ...firestoreData,
    updatedAt: !isUpdatedAt ? null : firestoreData?.updatedAt?.toDate() || null,
    createdAt: !isCreatedAt ? null : firestoreData?.createdAt?.toDate() || null,
    lastFeedbackAt: !isLastFeedbackAt ? null : firestoreData?.lastFeedbackAt?.toDate() || null,
    lastUpdated: !isLastUpdated ? null : firestoreData?.lastUpdated?.toDate() || null,
  };

  return object;
}
