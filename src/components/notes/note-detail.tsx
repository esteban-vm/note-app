import type { FC, Note } from '@/types'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaArrowLeft, FaTrash, FaFloppyDisk, FaPencil } from 'react-icons/fa6'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { alert, confirm, setOptions, type ConfirmOptions } from 'notie'
import { z } from 'zod'
import { useNotes } from '@/hooks'
import { isClean } from '@/utils'

setOptions({ positions: { confirm: 'bottom' }, overlayOpacity: 0, alertTime: 4 })

type FormValues = Pick<Note, 'title' | 'content'>

const NoteDetail: FC<{ isNew?: boolean }> = ({ isNew }) => {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation('note-detail')
  const [note, setNote] = useState<Note>()
  const { get, create, update, remove } = useNotes()

  const params = [isClean, { message: t('validations.clean') }] as const
  const validationSchema = z.object({
    title: z
      .string()
      .trim()
      .min(3, t('validations.title'))
      .max(40)
      .refine(...params),
    content: z
      .string()
      .trim()
      .min(10, t('validations.content'))
      .max(500)
      .refine(...params),
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: { title: '', content: '' },
  })

  useEffect(() => {
    if (isNew) return
    const savedNote = get(id)
    setNote(savedNote)
    if (!savedNote) {
      navigate('/')
    } else {
      setValue('title', savedNote.title)
      setValue('content', savedNote.content)
    }
  }, [get, id, isNew, navigate, setValue])

  if (!isNew && !note) return null

  const goBack = () => {
    navigate(-1)
    navigator.vibrate?.(20)
  }

  const commonOptions: Omit<ConfirmOptions, 'text'> = {
    submitText: t('options.submit'),
    cancelText: t('options.cancel'),
    cancelCallback: goBack,
  }

  const onCreate: SubmitHandler<FormValues> = ({ title, content }) => {
    confirm({
      text: t('confirms.create'),
      ...commonOptions,
      submitCallback() {
        create(title, content)
        alert({ text: t('alerts.create') })
        goBack()
      },
    })
  }

  const onUpdate: typeof onCreate = ({ title, content }) => {
    const prevTitle = note!.title
    const prevContent = note!.content
    if (prevTitle !== title || prevContent !== content) {
      confirm({
        text: t('confirms.update'),
        ...commonOptions,
        submitCallback() {
          update(id, title, content)
          alert({ text: t('alerts.update') })
          goBack()
        },
      })
    } else {
      goBack()
    }
  }

  const onRemove = () => {
    confirm({
      text: t('confirms.remove'),
      ...commonOptions,
      submitCallback() {
        remove(id)
        alert({ text: t('alerts.remove') })
        goBack()
      },
    })
  }

  return (
    <form className='note_detail' onSubmit={handleSubmit(isNew ? onCreate : onUpdate)} noValidate>
      <header>
        <button type='button' onClick={goBack} title={t('buttons.back')}>
          <FaArrowLeft />
        </button>
        {!isNew && (
          <button type='button' onClick={onRemove} title={t('buttons.remove')}>
            <FaTrash />
          </button>
        )}
        <button type='submit' title={isNew ? t('buttons.create') : t('buttons.update')}>
          {isNew ? <FaFloppyDisk /> : <FaPencil />}
        </button>
      </header>
      <input
        type='text'
        autoFocus={isNew}
        spellCheck={false}
        placeholder={t('inputs.title')}
        maxLength={40}
        {...register('title')}
      />
      {errors.title && <small>{errors.title.message}</small>}
      <textarea
        spellCheck={false}
        placeholder={isNew ? t('inputs.create') : t('inputs.update')}
        maxLength={500}
        {...register('content')}
      />
      {errors.content && <small>{errors.content.message}</small>}
    </form>
  )
}

export default NoteDetail
