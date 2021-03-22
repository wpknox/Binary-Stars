from django.conf.urls import url 
from binarystars import views 

urlpatterns = [ 
    url(r'^api/binarystars$', views.binarystars_list),
    url(r'^api/binarystars/(?P<pk>[0-9]+)$', views.binarystars_detail),
    url(r'^api/binarystars/cluster/dbscan$', views.binarystars_cluster_dbscan),
    url(r'^api/binarystars/cluster/kmeans/(?P<numClusters>[0-9]+)$', views.binarystars_cluster_kmeans)
]