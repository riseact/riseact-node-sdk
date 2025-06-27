import { Radio, RadioGroup, VStack, useToast } from '@chakra-ui/react';
import { CampaignInput, CampaignType, UserError, WebDocumentVisibility } from '@common/gql/graphql';
import { ActionButtons, Card, InputBox, Layout } from '@riseact/elements';
import { FC } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  initialValues?: CampaignInput;
  onSubmit: (values: CampaignInput) => Promise<UserError[] | undefined>;
  isSaveLoading: boolean;
}

const Form: FC<Props> = ({ initialValues, onSubmit, isSaveLoading }) => {
  const toast = useToast();
  const form = useForm<CampaignInput>({
    mode: 'onSubmit',
    defaultValues: {
      visibility: WebDocumentVisibility.Published,
      type: CampaignType.Donation,
      ...initialValues,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { isDirty, errors },
  } = form;

  const submit: SubmitHandler<CampaignInput> = async (values) => {
    const userErrors = await onSubmit(values);
    if (userErrors) {
      userErrors.map((e) => {
        if (e.field) {
          setError(e.field as keyof CampaignInput, {
            type: 'custom',
            message: e.message || 'Cannot process this field',
          });
        } else {
          toast({
            title: 'Something went wrong',
            description: e.message || 'Please try again later',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      });
    } else {
      reset({}, { keepValues: true });
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(submit)}>
        <Layout title="Overview">
          <Layout.Section>
            <VStack spacing={4}>
              <Card>
                <VStack spacing={5}>
                  <InputBox label="Title" error={errors.title?.message} {...register('title')} />
                </VStack>
              </Card>
            </VStack>
          </Layout.Section>

          <Layout.Section secondary>
            <VStack spacing={4}>
              <Card title="Visibility">
                <Controller
                  name="visibility"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup onChange={field.onChange} value={field.value || undefined}>
                      <VStack spacing={4} alignItems="start">
                        <Radio value={WebDocumentVisibility.Published}>Visible</Radio>
                        <Radio value={WebDocumentVisibility.Unpublished}>Hidden</Radio>
                      </VStack>
                    </RadioGroup>
                  )}
                />
              </Card>

              <Card title="Type">
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup onChange={field.onChange} value={field.value || undefined}>
                      <VStack spacing={4} alignItems="start">
                        <Radio value={CampaignType.Donation}>Donations</Radio>
                        <Radio value={CampaignType.Lead}>Lead</Radio>
                      </VStack>
                    </RadioGroup>
                  )}
                />
              </Card>
            </VStack>
          </Layout.Section>
        </Layout>

        <ActionButtons onSave={handleSubmit(submit)} isSaving={isSaveLoading} isSavingDisabled={!isDirty} />
      </form>
    </FormProvider>
  );
};

export default Form;
