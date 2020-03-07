import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
  perPage: 3
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, totalCount) {
    state.eventsTotal = totalCount
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  createEvent({commit, dispatch}, event) {
    return EventService.postEvent(event)
    .then(() => {
      commit('ADD_EVENT', event) 
      let notification = {
        type: 'success',
        message: 'Successfully created event!'
      }
      dispatch('notification/add', notification, {root: true})
    })
    .catch( error => {
      let notification = {
        type: 'error',
        message: 'There was a problem creating your event.'
      }
      dispatch('notification/add', notification, {root: true})
      throw error
    }) 
  },
  fetchEvents({commit, dispatch, state}, { page }) {
    return EventService.getEvents(state.perPage, page)
    .then(response => {
      commit(
        'SET_EVENTS_TOTAL', 
        parseInt(response.headers['x-total-count'])
      )
      commit('SET_EVENTS', response.data)
    })
    .catch(error => {
      let notification = {
        type: 'error',
        message: 'There was a problem fetching events: ' + error.message
      }
      dispatch('notification/add', notification, {root: true})
    })
  },
  fetchEvent({commit, getters}, id){
    let event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id)
      .then(response => {
        commit('SET_EVENT', response.data)
        return response.data
      })
    }
  }
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(ev => ev.id == id)
  }
}
