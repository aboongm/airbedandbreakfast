# frozen_string_literal: true

class PropertiesController < ApplicationController
    def show
        @property = Property.find(params[:id])
    end
end