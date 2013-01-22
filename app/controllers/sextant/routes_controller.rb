module Sextant
  class RoutesController < Sextant::ApplicationController
    layout 'sextant/application'

    before_filter :require_local!

    def index
      @routes = Sextant.format_routes
      if params[:term].present?
        @routes = search_routes(@routes).uniq
      end
    end

    private
    def require_local!
      unless local_request?
        render :text => '<p>For security purposes, this information is only available to local requests.</p>', :status => :forbidden
      end
    end

    def local_request?
      Rails.application.config.consider_all_requests_local || request.local?
    end

    def search_routes(routes) 
      routes = routes.select do |f| 
        f[:name] =~ /#{params[:term]}/i || 
        f[:reqs] =~ /#{params[:term]}/i ||
        f[:verb] =~ /#{params[:term]}/i
      end
    end

  end
end

