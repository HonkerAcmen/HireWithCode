import http from '@/api/http'

export const GetInfoByIdAPI = async (id) => {
  return await http({
    url: '',
    method: 'GET',
    params: { id },
  })
}

export const GetAllInfoAPI = async () => {
  return await http({
    url: '/info/all',
    method: 'GET',
  })
}

export const CreateInfoAPI = async (email, github_id) => {
  return await http({
    url: '/info/create',
    method: 'POST',
    data: {
      email,
      github_id,
    },
  })
}

export const SetInfoByGithubIdAPI = async (github_id, github_pj_add, project_online_add) => {
  return await http({
    url: '/info/set',
    method: 'POST',
    data: {
      github_id,
      github_pj_add,
      project_online_add,
    },
  })
}
